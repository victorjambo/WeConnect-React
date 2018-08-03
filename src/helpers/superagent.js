// import superagentAbsolute from 'superagent-absolute';
import request from 'superagent';

const agent = request.agent();
const requestAgent = process.env.REACT_APP_BASE_URL;

export default requestAgent;
