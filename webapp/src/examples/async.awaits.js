import React, { Component } from 'react';

class AsyncAwaitsComponent extends Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    this.load();
  }

  work = async () => {
    return new Promise((resolve) => setTimeout(resolve, 5000));
  }

  load = async () => {
    await this.work();
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        {loading && 'loading'}
        {!loading && 'finished'}
      </div>
    );
  }
}

export default AsyncAwaitsComponent;
