import React from "react";

class MemeGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImg: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        this.setState({
          allMemeImg: memes,
        });
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const randomNum = Math.floor(Math.random() * this.state.allMemeImg.length);
    const randoMemeImg = this.state.allMemeImg[randomNum].url;
    this.setState({
      randomImg: randoMemeImg,
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        <form className='meme-form' onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='topText'
            value={this.state.topText}
            placeholder='Top Text'
            onChange={this.handleChange}
          />
          <input
            type='text'
            name='bottomText'
            value={this.state.bottomText}
            placeholder='Bottom Text'
            onChange={this.handleChange}
          />
          <button>Gen</button>
        </form>

        <div className='meme'>
          <img src={this.state.randomImg} />
          <h2 className='top'>{this.state.topText}</h2>
          <h2 className='bottom'>{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
