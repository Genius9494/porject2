module.exports = {
    extends : ['next', 'prettier'],
    plugins : ['simple-import-sort','tailwindcss'],
    rules:{
        'simple-import-sort/imports': 'warn','simple-import-sort/exports': 'warn','tailwindcss/classnames-order' : 'warn', 'no-unused-vars' : 'warn'
    }
};