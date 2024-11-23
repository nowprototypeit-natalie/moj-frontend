const gulp = require('gulp')
const fs = require('fs').promises
const path = require('node:path')

gulp.task('build:now-prototype-it-config', async () => {
  const packageDir = path.join(__dirname, '..', 'package')
  const gpkConfigPath = path.join(packageDir, 'govuk-prototype-kit.config.json')
  const npiConfigPath = path.join(packageDir, 'now-prototype-it.config.json')
  const npiVariantPath = path.join(packageDir, 'now-prototype-it.variant.json')

  const npiGovukFrontendDependency = '@nowprototypeit/govuk-frontend-adaptor' // This should change to govuk-frontend if/when they have the required configuration

  const gpkFileContents = await readJsonFile(gpkConfigPath)
  const npiFileContents = {
    'version-2024-03': {
      ...gpkFileContents,
      nunjucksFilters: [
        '/moj/filters/now-prototype-it-filters.js'
      ],
      pluginDependencies: [
        npiGovukFrontendDependency,
        ...(gpkFileContents.pluginDependencies || [])
      ]
    }
  }

  await writeJsonFile(npiConfigPath, npiFileContents)
  await writeJsonFile(npiVariantPath, {
    'version-2024-03': {
      inheritFrom: [
        npiGovukFrontendDependency
      ]
    }
  })
})

async function readJsonFile(filePath) {
  const fileContents = await fs.readFile(filePath, 'utf8')
  return JSON.parse(fileContents)
}

async function writeJsonFile(filePath, contents) {
  const fileContents = JSON.stringify(contents, null, 2)
  return fs.writeFile(filePath, fileContents)
}
