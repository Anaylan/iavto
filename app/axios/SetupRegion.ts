export default function setupRegion(axios: any, store: any) {
  axios.interceptors.request.use(
    (config: any) => {
      try {
        const {
          region: { id },
        } = store.getState();

        if (id) {
          config.headers.Region = `${id}`;
        }
        return config;
      } catch (e) {
        console.log(e);
      }
    },
    (err: any) => Promise.reject(err),
  );
}
