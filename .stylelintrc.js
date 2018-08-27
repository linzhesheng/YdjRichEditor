module.exports = {
    extends: ['stylelint-config-ydj/scss', 'stylelint-config-ydj/prettier', 'stylelint-config-css-modules'],
    ignoreFiles: [
        '**/*.md',
        '**/*.{ts, tsx}',
        '**/*.js'
    ]
}
