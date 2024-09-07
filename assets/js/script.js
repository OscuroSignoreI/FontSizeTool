const baseFontSizeInput = document.getElementById('baseFontSize');
const unitInput = document.getElementById('unit');
const scaleFactorInput = document.getElementById('scaleFactor');
const customTextInput = document.getElementById('customText');
const outputDiv = document.getElementById('output');
const generatedCSSTextArea = document.getElementById('generatedCSS');

function generateTypeScale() {
    const baseFontSize = parseFloat(baseFontSizeInput.value);
    const unit = unitInput.value;
    const scaleFactor = parseFloat(scaleFactorInput.value);
    const customText = customTextInput.value || 'Inserisci il tuo testo';

    let outputHtml = '';
    let cssOutput = '';

    const htmlTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'small'];
    const previewClasses = ['preview-h1', 'preview-h2', 'preview-h3', 'preview-h4', 'preview-h5', 'preview-h6', 'preview-p', 'preview-small'];

    let fontSize = baseFontSize;
    
    htmlTags.forEach((tag, index) => {
        if (tag === 'p') {
            fontSize = baseFontSize;
        } else if (tag === 'small') {
            fontSize = baseFontSize * 0.833;
        } else {
            fontSize = baseFontSize * Math.pow(scaleFactor, (6 - index));
        }

        let unitFontSize = `${fontSize.toFixed(2)}${unit}`;

        outputHtml += `
            <div class="output-text ${previewClasses[index]}" style="font-size: ${unitFontSize};">
                <${tag}>${customText}</${tag}> <span class="unit-label">(${fontSize.toFixed(2)}${unit})</span>
            </div>
        `;

        cssOutput += `${tag} {\n    font-size: ${unitFontSize};\n}\n\n`;
    });

    outputDiv.innerHTML = outputHtml;
    generatedCSSTextArea.value = cssOutput;
}

generateTypeScale();

baseFontSizeInput.addEventListener('input', generateTypeScale);
unitInput.addEventListener('change', () => {
    if (unitInput.value === 'rem' || unitInput.value === 'em') {
        baseFontSizeInput.value = 1;
    } else if (unitInput.value === 'px' || unitInput.value === 'pt' || unitInput.value === '%') {
        baseFontSizeInput.value = 16;
    }
    generateTypeScale();
});
scaleFactorInput.addEventListener('change', generateTypeScale);
customTextInput.addEventListener('input', generateTypeScale);
