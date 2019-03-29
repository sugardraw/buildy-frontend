# buildy-frontend

### Buildy App for Android - an inner-reform and interior design App
#### Final Proyect at DCI School Berlin

team: Ansumana Darboe, Gaia Cicaloni and Sergio Usle


## To run this project:
1. Clone the project
2. ` npm install `
3. then, go to node_modules/expo-pixi/components/sketch.js
4. copy this function after the function undo():
``` 
deleteAll = () => {
    if (!this.renderer) {
      return null;
    }

    const { children } = this.stage;
    if (children.length > 0) {

      for (var i = children.length - 1; i >= 0; i--) {	this.stage.removeChild(children[i]);}
      this.renderer._update();
      // TODO: This doesn't really work :/
      setTimeout(() => this.props.onChange && this.props.onChange(this.renderer), 2);
      return children;
    } else if (this.points.length > 0) {
      return this.deleteAll();
    }
  }; 
  
  ```
5. run ` expo start `



