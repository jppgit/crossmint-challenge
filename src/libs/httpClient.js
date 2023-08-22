const apiHost = "https://challenge.crossmint.io/api/";

let HttpClient = {
  requestStats: {
    requestsNeededToSend: 0,
    totalSentRequest: 0,
    sucessRequest: 0,
    failedRequest: 0,
  },
  async asyncCall(routePath, method, body) {
    try {
      const response = await fetch(`${apiHost}${routePath}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (response.status === 429) {
        throw JSON.stringify(body);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async createAll(astralObects, progresStatusCallback, requestLogs) {
    console.log(this);
    let requestFailed = [];

    let objects = [...astralObects];

    let totalRequestToDoIt = (this.requestStats.requestsNeededToSend =
      objects.length);

    for (var i = 0; i < objects.length; i++) {
      try {
        let body = objects[i];

        this.requestStats.totalSentRequest++;
        let requestPath = body.name;
        requestLogs(`New Astral Object Create ${body.emoji}`);
        await this.asyncCall(requestPath, "POST", body);
        console.log("Astral Object created OK", i);
        let doneRequest = this.requestStats.sucessRequest++;
        const percentage = this.calculateProgresss(
          totalRequestToDoIt,
          doneRequest
        );
        console.log("prog", percentage);
        progresStatusCallback(percentage);
      } catch (e) {
        this.requestStats.failedRequest++;
        requestFailed.push(JSON.parse(e));
      }
    }
    if (requestFailed.length > 0) {
      return await this.createAll(requestFailed, progresStatusCallback);
    }

    return this.requestStats;
  },
  calculateProgresss(total, done) {
    total = parseInt(total);
    done = parseInt(done);
    if (done === 0) {
      return 0;
    }

    console.log(done, total);
    return parseFloat(done / total) * 100;
  },
};

export default HttpClient;
