export class Queue {
  constructor() {
    this.queue = [];
    this.pendingPromise = false;
  }

  enqueue_slow(fun) {
    return this.enqueue(() => {
      return new Promise((resolve, reject) => {
        try {
          fun()
          setTimeout(resolve, 1000)
        } catch (err) {
          console.log(err)
          reject(err)
        }
      })
    })
  }

  enqueue_fun(fun) {
    return this.enqueue_slow(fun)
    // return this.enqueue(() => {
    //   return new Promise((resolve, reject) => {
    //     try {
    //       resolve(fun())
    //     } catch (err) {
    //       reject(err)
    //     }
    //   })
    // })
  }

  enqueue(promise) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        promise,
        resolve,
        reject,
      });
      this.dequeue();
    });
  }

  dequeue() {
    if (this.workingOnPromise) {
      return false;
    }
    const item = this.queue.shift();
    if (!item) {
      return false;
    }
    try {
      this.workingOnPromise = true;
      console.log(item.promise)
      item.promise()
        .then((value) => {
          this.workingOnPromise = false;
          item.resolve(value);
          this.dequeue();
        })
        .catch(err => {
          this.workingOnPromise = false;
          item.reject(err);
          this.dequeue();
        })
    } catch (err) {
      this.workingOnPromise = false;
      item.reject(err);
      this.dequeue();
    }
    return true;
  }
}
