
export default class HealthController {

  /**
   * Get all profiles
   * @param req
   * @param res
   */
  static get(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({ts: new Date().toJSON(), bla: 'test'});
  }

}
