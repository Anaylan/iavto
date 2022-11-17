export default function setupAxios(axios: any, store: any) {
  axios.interceptors.request.use(
    (config: any) => {
      try {
        const {
          header: { title },
        } = store.getState();

        if (title) {
          config.headers.Authorization = `${title}`;
        }

        return config;
      } catch (e) {
        console.log(e);
      }
    },
    (err: any) => Promise.reject(err),
  );
}
