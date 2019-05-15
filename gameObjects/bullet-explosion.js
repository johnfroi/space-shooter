function SHIP_1_BULLET_EXPLOSION() {
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
    this.xPos = x - (this.width / 2);
    this.yPos = y - (this.height / 2);;
    this.image.src='alpha-1/alpha-1-bullet-explosion.png';
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

function ship1BulletExplosionController() {
  bulletExplosions = bulletExplosions.filter(bulletExplosion_=> bulletExplosion_.isActive);
  for(let i = 0;i<bulletExplosions.length;i++){
    bulletExplosions[i].draw(CAN);
  }
}
