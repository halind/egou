let URL_API = 'https://zhonghekeep.com/'
let URL_SHOW='https://zhonghekeep.com/'

if(process.env.NODE_ENV === 'development'){
	URL_API = 'http://192.168.1.104:8080/'
	URL_SHOW='http://192.168.1.104:8080/'
}

export const RESOURCE = {
  URL_API,
  URL_SHOW,
}