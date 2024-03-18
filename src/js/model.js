function CreateModelBarcode() {
  async function getTypeBarcodes() {
    const inputsTypeValue = document.querySelectorAll('.barcode-options-container [type="checkbox"]:checked');
    const typesBarcode = Array.from(inputsTypeValue, (input) => input.value);
    return typesBarcode;
  }

  return {
    getTypeBarcodes,
  };
}

export { CreateModelBarcode };
