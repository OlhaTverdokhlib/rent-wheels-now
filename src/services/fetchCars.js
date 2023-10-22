const apiUrl = 'https://652efcd00b8d8ddac0b22788.mockapi.io/api/cars';

const fetchCars = async () => {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Помилка під час запиту');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export default fetchCars;
