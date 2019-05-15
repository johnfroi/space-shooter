function MUZZLE() {
  this.xPos = 0;
  this.yPos = 0;
  this.width = 30;
  this.height = 30;
  this.animStepSpeed = 0.4;
  this.animStep = 0;
  this.maxAnimStep = 5;
  this.width = 30;
  this.height = 30;
  this.image = new Image();
  this.isActive = true;
  this.init = (x,y) => {
    this.xPos = x;
    this.yPos = y -(this.height / 2);
    this.image.src='alpha-1/alpha-1-muzzle.png';
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

function muzzleController() {
  muzzles = muzzles.filter(muzzle_=> muzzle_.isActive);
  for(let i = 0;i<muzzles.length;i++){
    muzzles[i].draw(CAN);
  }
}
