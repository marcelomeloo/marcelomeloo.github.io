
const instance = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 1000,
});

instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


document.getElementById('loadJson').addEventListener('click', async () => {
  try {
    const response = await instance.get('/api/json-data');
    const jsonData = response.data;
    document.getElementById('jsonData').innerText = JSON.stringify(jsonData);
  } catch (error) {
    console.error(error);
  }
});

document.getElementById('submitForm').addEventListener('click', async (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  try {
    const { data } = await instance.get(`/api/data/${name}`);
    alert(data);
  } catch (error) {
    console.error([error.message, error.response.data]);
    console.error(error);
  }
});

