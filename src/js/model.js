// import { Quagga } from "quagga";



const modelBarcode = () => {
  

  const getTypeBarcodes = async () => {
    try {
      const inputsTypeValue = document.querySelectorAll(
        '.barcode-options-container [type="checkbox"]:checked'
      );
      return [...inputsTypeValue].map((input) => input.value);
    } catch (error) {
      console.error("Error fetching barcode types:", error);
      return [];
    }
  };

  return {
    getTypeBarcodes,
  };
};

export { modelBarcode };
