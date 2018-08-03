import superagentAbsolute from 'superagent-absolute';
import request from 'superagent';

const agent = request.agent();
const requestAgent = superagentAbsolute(agent)(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_API_VERSION);

export default requestAgent;
