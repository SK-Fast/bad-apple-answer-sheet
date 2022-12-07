const fs = require('fs')
const fsPromise = require('fs/promises')
const jimp = require('jimp')
const JSDOM = require('jsdom').JSDOM
const { Resvg } = require('@resvg/resvg-js')

const answerSheetData = fs.readFileSync('./answersheet.svg', 'utf-8')

async function svgRender(toprocess, frameName) {
    const imgData = await jimp.read(toprocess)

    let result = []

    for (let y = 0;y <= 27;y++) {
        let resultD = []

        for (let x = 0;x <= 20;x++) {
            const px = imgData.getPixelColor(x,y)
            const rgba = jimp.intToRGBA(px)

            if (px == 255) {
                resultD.push(1)
            } else {
                resultD.push(0)
            }
        }

        result.push(resultD)
    }

    const dom = new JSDOM(answerSheetData);
    const doc = dom.window.document
    const answersContainer = doc.querySelector(`.answers_container`)

    let yI = 0

    for (const y of result) {
        yI++
        if (yI > 27) {
            break
        }
        const containerD = answersContainer.querySelector(`.c-${yI}`)
        let i = 0

        for (const x of y) {
            i++
            
            const b = containerD.querySelector(`.b-${i}`)

            if (b) {
                const drawzone = b.querySelector('.drawzone')

                if (x == 1) {
                    drawzone.setAttribute('fill' , "#000000")
                } else {
                    drawzone.remove()
                }
            }
        }
    }


    let svgResult = doc.documentElement.outerHTML

    svgResult = svgResult.replace('<html><head></head><body>', '')
    svgResult = svgResult.replace('</body></html>', '')

    const resvg = new Resvg(svgResult)
    const pngData = resvg.render()
    const pngBuffer = pngData.asPng()

    await fsPromise.writeFile(`./render-frames/${frameName}`, pngBuffer)
}

async function main() {

    console.log("Rendering")

    let fI = 0

    const frames = fs.readdirSync('./frames')

    for (const f of frames) {
        fI++
        const image = await jimp.read(`./frames/${f}`);

        image.resize(20, 27, jimp.AUTO)

        image.write(`./process-temp/${f}`, async () => {
            await svgRender(`./process-temp/${f}`, f)
            console.log(`Rendered Frame ${(fI / 6593) * 100}% (${fI}/6593)`)
        })    
    }

    console.log("Complete")
}

main()

process.on('unhandledRejection', error => {
    // Will print "unhandledRejection err is not defined"
    console.log('unhandledRejection', error.message);
});

process.on('uncaughtException', error => {
    // Will print "unhandledRejection err is not defined"
    console.log('uncaughtException', error.message);
});
