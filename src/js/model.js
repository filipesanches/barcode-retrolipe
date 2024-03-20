import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Quagga from 'quagga';

const modelBarcode = () => {
  const getTypeBarcodes = async () => {
    try {
      const selectedCheckboxes = document.querySelectorAll('.barcode-options-container [type="checkbox"]:checked');
      return [...selectedCheckboxes].map((checkbox) => checkbox.value);
    } catch (error) {
      console.error('Erro ao buscar tipos de códigos de barras:', error);
      return [];
    }
  };

  function scanBeeper() {
    return new Audio('https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3').play();
  }

  const scanDetection = async () => {
    try {
      Quagga.onDetected(async (result) => {
        const code = result.codeResult.code;
        const barcodeValue = document.querySelector('#barcode');
        scanBeeper();
        barcodeValue.value = code;
        Quagga.stop();
        document.querySelector('#barcode-scan').remove();
      });
    } catch (error) {
      console.error('Erro ao detectar código de barras:', error);
    }
  };

  const scanBarcode = async () => {
    try {
      await Quagga.init(
        {
          inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: document.querySelector('#barcode-scan'),
            constraints: {
              // width: 500,
              // height: 200,
              facingMode: 'environment', // or "user" for front camera
            },
          },
          decoder: {
            readers: [
              'code_128_reader',
              'ean_reader',
              'ean_8_reader',
              'code_39_reader',
              'code_39_vin_reader',
              'codabar_reader',
              'upc_reader',
              'upc_e_reader',
              'i2of5_reader',
              '2of5_reader',
              'code_93_reader',
            ], // You can add more barcode types if needed
            debug: {
              drawBoundingBox: true,
              showFrequency: true,
              drawScanline: true,
              showPattern: true,
            },
            locate: true,
            multiple: false,
          },
          locator: {
            halfSample: true,
            patchSize: 'medium', // small, medium, large, x-large
          },
          locator: {
            patchSize: 'medium',
            halfSample: true,
          },
          numOfWorkers: 4,
          frequency: 10, // Controla a frequência de detecção (10 vezes por segundo)
          locate: true,
          halfSample: true,
          locate: true,
          multiple: false,
          debug: {
            showFrequency: true,
          },
          locate: true,
        },
        (err) => {
          if (err) {
            console.error('Erro ao inicializar Quagga:', err.message);
            return;
          }
          Quagga.start();
          scanDetection();
        },
      );

      return true; // Indicar sucesso
    } catch (error) {
      throw new Error('Erro ao inicializar Quagga:', error);
    }
  };

  return {
    getTypeBarcodes,
    scanBarcode,
  };
};

export { modelBarcode };
