const baseFontSizeInput = document.getElementById('baseFontSize');
const unitInput = document.getElementById('unit');
const scaleFactorInput = document.getElementById('scaleFactor');
const customTextInput = document.getElementById('customText');
const headingColorInput = document.getElementById('headingColor');
const paragraphColorInput = document.getElementById('paragraphColor');
const fontFamilyInput = document.getElementById('fontFamily');
const customFontFamilyInput = document.getElementById('customFontFamily');
const lineHeightInput = document.getElementById('lineHeight');
const outputDiv = document.getElementById('output');
const generatedCSSTextArea = document.getElementById('generatedCSS');
const downloadButton = document.getElementById('downloadCSS');

function generateTypeScale() {
    const baseFontSize = parseFloat(baseFontSizeInput.value);
    const unit = unitInput.value;
    const scaleFactor = parseFloat(scaleFactorInput.value);
    const customText = customTextInput.value || 'Inserisci il tuo testo';
    const headingColor = headingColorInput.value;
    const paragraphColor = paragraphColorInput.value;
    let fontFamily = fontFamilyInput.value;
    const lineHeight = lineHeightInput.value;

    // Handle custom font family
    if (fontFamily === 'custom') {
        fontFamily = customFontFamilyInput.value || 'Arial, sans-serif';
    }

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
        const color = tag === 'p' || tag === 'small' ? paragraphColor : headingColor;

        outputHtml += `
            <div class="output-text ${previewClasses[index]}" style="font-size: ${unitFontSize}; font-family: ${fontFamily}; color: ${color}; line-height: ${lineHeight};">
                <${tag}>${customText}</${tag}> <span class="unit-label">(${fontSize.toFixed(2)}${unit})</span>
            </div>
        `;

        cssOutput += `${tag} {\n    font-size: ${unitFontSize};\n    color: ${color};\n    font-family: ${fontFamily};\n    line-height: ${lineHeight};\n}\n\n`;
    });

    outputDiv.innerHTML = outputHtml;
    generatedCSSTextArea.value = cssOutput;
}

function downloadCSSFile() {
    const blob = new Blob([generatedCSSTextArea.value], { type: 'text/css' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'generated.css';
    link.click();
}

// Add event listeners
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
headingColorInput.addEventListener('input', generateTypeScale);
paragraphColorInput.addEventListener('input', generateTypeScale);
fontFamilyInput.addEventListener('change', () => {
    if (fontFamilyInput.value === 'custom') {
        customFontFamilyInput.style.display = 'block';
    } else {
        customFontFamilyInput.style.display = 'none';
        generateTypeScale();
    }
});
customFontFamilyInput.addEventListener('input', generateTypeScale);
lineHeightInput.addEventListener('input', generateTypeScale);
downloadButton.addEventListener('click', downloadCSSFile);

// Initialize the preview on page load
generateTypeScale();
