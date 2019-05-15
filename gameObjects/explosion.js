function EXPLOSION() {
  this.xPos = 0;
  this.yPos = 0;
  this.width = 30;
  this.height = 30;
  this.animStepSpeed = 0.4;
  this.animStep = 0;
  this.maxAnimStep = 5;
  this.width = 60;
  this.height = 60;
  this.image = new Image();
  this.isActive = true;
  this.init = (x,y) => {
    this.xPos = x - (this.width / 2);
    this.yPos = y - (this.height / 2);
    this.image.src='explosion.png';
  }
  this.draw = (CAN_) => {
    if(this.maxAnimStep <= this.animStep) {
      this.isActive = false;
    }
    CAN_.save();
    CAN_.translate(this.xPos,this.yPos);
    CAN_.drawImage(
      this.image,
      this.width * Math.floor(this.animStep),
      0,
      this.width,
      this.height,
      0,
      0,
      this.width,
      this.height);
      CAN_.restore();
    this.animStep += this.animStepSpeed;
  }
}

function explosionController() {
  explosions = explosions.filter(explosion_=> explosion_.isActive);
  for(let i = 0;i<explosions.length;i++){
    explosions[i].draw(CAN);
  }
}
