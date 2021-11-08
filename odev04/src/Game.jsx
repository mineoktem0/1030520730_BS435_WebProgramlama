import React, { Component } from 'react';
const cat = 'http://localhost:8080/cat.jpg'
const dog = 'http://localhost:8080/dog.jpg'
const back = 'http://localhost:8080/back.jpg'

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

importAll(require.context('../public', false, /\.(gif|jpe?g|svg)$/));

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [cat, dog, dog],
            cardStates: ['back', 'back', 'back'],
            tryCount: 0,
            isGameStarted: false,
            gameState: null
        }
    }


    componentDidMount(){
        this.startGame();
    }

    shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return(array);
    }

    setCardState = (index, state) => {
        let cardStates = this.state.cardStates;
        cardStates[index] = state;
        this.setState({
            cardStates: cardStates
        })
    } 
    
    setGameState = (state) => {
        this.setState({
            gameState: state
        })
    }

    setIsGameStarted = (value) => {
        this.setState({
            isGameStarted: value
        })
    }

    shuffleImages = () => {
        this.setState({
            images: this.shuffleArray(this.state.images)
        })
    }

    setTryCount = (val) => {
        this.setState({
            tryCount: val
        })
    }
    clickImage = (index) => {
        if(this.state.isGameStarted && this.state.cardStates[index] == 'back'){
            this.setTryCount(this.state.tryCount+1);
            this.setCardState(index, 'front');
            if(this.state.images[index] === cat){
                this.setGameState(<p id={"win"}>Kazandın :) Yeni bir oyun oynamak istersen <span className="link" onClick={this.startGame}>buraya</span> tıkla.</p>)
                this.setIsGameStarted(false);
            }else if(this.state.tryCount >= 1){
                this.setGameState(<p id={"lose"}>Kaybettin :( Yeniden denemek istersen <span className="link" onClick={this.startGame}>buraya</span> tıkla.</p>)
                this.setIsGameStarted(false);
            }
        }
    }
    
    startGame = () => {
        this.shuffleImages();
        this.setTryCount(0);
        for (let i = 0; i < 3; i++) {
            this.setCardState(i, 'back');
        }
        this.setGameState(<p id={"info"}>Kedi kartını bulmak için kartın üzerine tıklamalısın.</p>)
        this.setIsGameStarted(true);
    }
    render() {
        const {images, cardStates} = this.state;
        return (
            <>
                <p style={{paddingLeft:50, paddingRight: 50}}>Bu oyunda üç kapalı kart içindeki kediyi bulman gerekmektedir. Eğer ilk seferde bulamaz isen 2. seçim hakkı tanınacaktır.</p>
                <div id={"cards"} style={{ display:'flex', flexDirection:'row', justifyContent:'space-between', paddingLeft:'15%', paddingRight:'15%'}}>
                    <img style={imgStyle} src={cardStates[0] === 'back' ? back : images[0]} onClick={()=>{this.clickImage(0)}}/>
                    <img style={imgStyle} src={cardStates[1] === 'back' ? back : images[1]} onClick={()=>{this.clickImage(1)}}/>
                    <img style={imgStyle} src={cardStates[2] === 'back' ? back : images[2]} onClick={()=>{this.clickImage(2)}}/>
                </div>
                <div id={"gameState"} style={{width: '100%',color: 'black', backgroundColor:'green'}}>
                    {this.state.gameState}
                </div>
            </>
        );
    }
}


const imgStyle = {
    width:'30%',
    height:'40%',
    border:'1px solid rgba(0, 0, 0, 1)'
}