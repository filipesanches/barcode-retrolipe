import JsBarcode from 'jsbarcode';

const viewBarcode = () => {
  const resetInputs = () => {
    const checkboxes = document.querySelectorAll('.barcode-options-container [type="checkbox"]');
    checkboxes.forEach((checkbox) => (checkbox.checked = false));
    document.querySelector('#barcode').value = '';
  };

  const hideElementLabel = () => {
    document.querySelectorAll('[id*="img-code-"]').forEach((element) => {
      element.style.display = 'none';
    });

    document.querySelectorAll('.images-container a').forEach((element) => {
      element.remove();
    })
  };

  const generateBarcode = async (barcodeValue, text) => {
    return new Promise((resolve, reject) => {
      JsBarcode(`[data-label="${barcodeValue}"]`, text, {
        format: barcodeValue,
        text: text,
        width: 2,
        height: 40,
        valid: (valid) => {
          resolve(valid);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  };

  const renderButtonDownload = async (url, element, downloadName) => {
    const button = document.createElement('a');
    button.href = url;
    button.download = 'retrolipe_barcode_'+downloadName; // Adicionando o atributo 'download'

    // Inserindo o botão antes do elemento fornecido
    element.parentNode.insertBefore(button, element.nextSibling);
}

  const renderBarcode = async (typesBarcode, text) => {
    const barcodeElements = document.querySelectorAll('[data-label]');
    for (let i = 0; i < barcodeElements.length; i++) {
      const barcodeValue = barcodeElements[i].getAttribute('data-label');
      if (typesBarcode.includes(barcodeValue)) {
        barcodeElements[i].style.display = 'block';
        try {
          const isValid = await generateBarcode(barcodeValue, text);
          const url = await renderButtonDownload(barcodeElements[i].src, barcodeElements[i], text);
          if (!isValid) {
            console.error('Erro ao gerar código de barras:', error);
          }
        } catch (error) {
          barcodeElements[i].style.display = 'block';
          barcodeElements[i].src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATwAAAAeCAYAAACxFqKPAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAUbSURBVHhe7Zy9cuo6EMf33heBFBkoeAcPTWjS4QdwBdWp0jBD7RmaU6UiFQ8A3WlIk+EdKJxJATzJvStZNvIHSMbyyYf/vxlPsC20q9VqrV0z+afX6/1HAADQAv5VfwEA4MeDgAcAaA0IeACA1oCABwBoDQh4AIDWgIAHAGgNCHgAgNaAgOeQ8TKiaDlWZ9+DizqPlxRFEW1nA3Xhc/iONnXOF5mLn8DlgKeMnD++vNGl3ktq+RIB4PvTwFo27PB2NO/3qa8do8Ve3QM/ms0U8/1VwFw4AyktAKA11A54g9k2k/JG2xllkl6xLZXXxrTU2qVlmcGMtrxtnSX9iLZpOp3bzubTbE1Wqkfo8ZlHodYun4YbdbYlp48UncOZLP7WbKv1w8dN4zLpnLt/qXxWkFXS3t3Y832VpDlXfEMi7strF/xQYNNGYJLFFO1zQ2pmMReixin8QNY6r8py4D9N2lBrkOrRwFquFfCEkdfBUUt7fVpRQOu80A5fiyZ08ON2/upEXqhPikfB8I18f0Un0XZyIL8/54Tao4ekkQiMD69Kjjj4vmirDLVfjOLr8x2fZVNxPRWw1tmANHRIGTlStIYrWdwTO8+aguM8lSWOquOy0TlJn6R91aU8op+MLNXJbt6n6UZ+dDh2xgtpffdy7ufEi0BfQQbfSDH6IWNqYyOLF3N27OKYkjKNPRZzIegEawop8Q3R1qNJJjC48R+JAxsW/ZBldUNKgl6Ta9kQ8LLRNYq2lNqRJ37CAXg31ydyT4snEbSG9JiReKKVP6JE1/2fN77Spfu0Dd9/WvC3Y3Yv588p+wWNktUk2dDrNS8oo5LO1xjTr6CT6yeHM1miqwl5pxX5mfFrWMmy0NmS3l2Hhb2e+9k8cxAi6iYT6nDskh0v1HTs3M8LT7z3cF5k1r5h8kOBoY21LO1h3TQZ+8T6dO566tyV/yTUteGAHocdOq2es7Lyc2riRh+r+NLiPIiYEx3e1ceE/QcdqUOavZkjfejfE05T6MtEcUtelkKasdX5CoN7nj4bHMhiZIA5fvB0XsMgy1pnM+8Hjm66c45/EcdSVlHX0M3YL6MvMlvfsPFDUxsLWWJnxtlKNzy3yadifxMn/pNS14Y9EuqIXaluwzh9rUp1H6tZwyvpWC6sEkVqIZyMt+S8YfW1AFxIx6xwoLM0qg0O7dO9ZytcwyDLWmdbtN0/O6uezsY07RvJonLpGyYqyJKLXLXh4Ee8wD8z6NX2H8cIf0nsdz6qZh/Vdb494PGEyl1oJn9nh/gdUGf3UnH3Zon+lBovy5/i7wce7oV0wpnOcdrgTZJagVgIuSe9Q/tsnsU2PaDflxaMlSwLna2IU5K8w2aCXaO+MaYlK51NiRgb33BFVVn7P/TGm+LPwo3/uGJDz2V1vzIaWMu1dnibqXi66XU+VRi9VCu4GZWbe+F5Czw50FwUjvKwIZ6kQROdsumEK503U1WsVn0M33xZnNVxZh8e00jtEpIx3TIuG51FITj+fsiuJhxKnadF+bjeots3PbTCvauxx+mzNu9xtVsrXlfwjdrYySq8OVS21gvuNpjnwhJH/uMK8VLCX3U1WerIj6uBtYx/8Q4qIt74xUEn41eDGW3XAR0LqS0AX4eaNTzQOmSNpMjgcUidhuo9ALgCOzxQHfGj0ULhSrzRr/+TFwCaBAEPANAakNICAFoDAh4AoDUg4AEAWgMCHgCgNSDgAQBaAwIeAKA1IOABAFoC0f/KPW7r9an7pAAAAABJRU5ErkJggg==';
          console.error('Erro ao gerar código de barras:', error);

        }
      }
    }
    // Todos os códigos de barras foram renderizados com sucesso
    return true;
  };

  return {
    resetInputs,
    hideElementLabel,
    renderBarcode,
  };
}

export { viewBarcode };
