export default function setupAxios(axios: any, store: any) {
  axios.interceptors.request.use(
    (config: any) => {
      try {
        const {
          header: { title },
        } = store.getState();

        const {
          region: { id },
        } = store.getState();

        if (title) {
          config.headers.authorization = `${title}`;
        }

        if (id) {
          config.headers.region = `${id}`;
        }

        return config;
      } catch (e) {
        console.log(e);
      }
    },
    (err: any) => Promise.reject(err),
  );
}
