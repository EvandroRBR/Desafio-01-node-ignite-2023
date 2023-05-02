import { parse } from 'csv-parse'
import fs from 'node:fs'

const csvPath = new URL('./tasks.csv', import.meta.url)

const stream = fs.createReadStream(csvPath)

const csvParse = parse({
  delimiter: ',',
  skipEmptyLines: true,
  fromLine: 2
})

async function run() {
  const linesParse = stream.pipe(csvParse)
  console.log('linesParse: ', linesParse)

  for await (const line of linesParse) {
    const [title, description] = line
    console.log('description: ', description)
    console.log('title: ', title)

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description
      })
    })
  }
}

run()
