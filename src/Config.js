// eslint-disable-next-line import/no-anonymous-default-export
console.log(process.env)
const Config = {
    endpoint_prod: 'https://stored.tube',
    endpoint_dev: 'http://localhost:3100',
    endpoint_api: null
};
if(process.env.NODE_ENV === "development") {
    Config.endpoint_api = Config.endpoint_dev
} else {
    Config.endpoint_api = Config.endpoint_prod
}
console.log(Config.endpoint_api)
export default Config