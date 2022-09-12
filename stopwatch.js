class Stopwatch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {  
        isStarted: false,  
        milliseconds: '00',
        seconds: '00',
        minutes: '00',
        hours: '00',
      }; 
    }
  
    //Запуск секундомера
    start() {
      if (!this.state.isStarted){
        this.setState({isStarted: true});
        this.timerID = setInterval(
          () => this.tick(),
          10
        );
      };
    }

    //Приостановка секундомера
    stop() {
      if(this.state.isStarted) {
        clearInterval(this.timerID);
        this.setState({isStarted: false});
      };
    }

    //Сброс времени
    reset() {
      if (this.state.isStarted) {this.stop()};
      let canvas = document.getElementById("stopwatch-canvas");
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.setState({
        milliseconds: '00',
        seconds: '00',
        minutes: '00',
        hours: '00',                   
      });
    }
  
    //Изменение времени
    tick() {
      let mls = (Number(this.state.milliseconds) + 1);
      let sec = Number(this.state.seconds);
      let min = Number(this.state.minutes);
      this.drawCanvas(mls, sec);

      if (mls > 99) {
        sec = (sec + 1).toString();
        mls = 0;
        this.setState({
          milliseconds: '00',
          seconds: sec.length == 1 ? '0' + sec : sec,         
        });
      };

      if (sec > 59) {
        min = (min + 1).toString();
        sec = 0;
        this.setState({
          seconds: '00',
          minutes: min.length == 1 ? '0' + min : min,         
        });
      };

      if (min > 59) {
        let hrs = (Number(this.state.hours) + 1).toString();
        min = 0;
        this.setState({
          minutes: '00',
          hours: hrs.length == 1 ? '0' + hrs : hrs,                   
        });
      };
      
      mls = mls.toString();  
      this.setState({
        milliseconds: mls.length == 1 ? '0' + mls : mls,
      });
    }

    //Отрисовка шкалы прогресса
    drawCanvas(mls, sec){
      let canvas = document.getElementById("stopwatch-canvas");
      let ctx = canvas.getContext("2d");
      ctx.lineWidth = 10;
      ctx.strokeStyle = sec % 2 ?"#0A041D" : "#FFA927";
      ctx.beginPath();
      ctx.arc(120, 120, 116, (-0.5*Math.PI) , (-0.5*Math.PI + mls*0.02*Math.PI), false);
      ctx.stroke();
    }
  
    render() {
      return (
        <div>
          <div>
            <div id="stopwatch-circle" className="row text-center align-items-center">
              <h3 className="col my-0">{this.state.hours}:{this.state.minutes}:{this.state.seconds}</h3>
            </div>
            <canvas id="stopwatch-canvas" className="mb-5" width="240" height="240">
            </canvas>
          </div>
          {!this.state.isStarted && 
            <button type="button" className="btn" onClick={() => this.start()}>Старт</button>
          }
          {this.state.isStarted && 
            <button type="button" className="btn" onClick={() => this.stop()}>Стоп</button>
          }         
          <button type="button" className="btn ms-4" onClick={() => this.reset()}>Reset</button>
        </div>       
      );
    }
  }
  
  const root = ReactDOM.createRoot(document.getElementById('root-stopwatch'));
  root.render(<Stopwatch />);