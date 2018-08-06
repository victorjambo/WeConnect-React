import request from 'superagent';
import superagentAbsolute from './superagent-absolute';

const agent = request.agent();
const requestAgent = superagentAbsolute(agent)(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_API_VERSION);

export default requestAgent;
