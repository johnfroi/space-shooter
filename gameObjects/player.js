function PLAYER() {
  this.life = 3;
  this.animStep = 0;
  this.maxAnimStep = 5;
  this.speed = 2;
  this.animStepSpeed = 0.4;
  this.xPos = 0;
  this.yPos = 0;
  this.width = 60;
  this.height = 30;
  this.image =new Image();
  this.isActive = true;
  this.miniShooterAdapter = new MINI_SHOOTER_ADAPTER();
  this.init = ()=> {
    this.image.src = 'alpha-1/alpha-1.png';
  },
  this.draw = (CAN_) => {
    if(!this.isActive) {
      return false;
    }
    if(this.animStep >= this.maxAnimStep) {
      this.animStep = 0;
    }
    this.checkLife();
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
    this.animStep+=0.2;
    this.drawGuideDot(CAN_);
    this.playerMovement();
    this.miniShooterAdapter.draw(CAN_);
  };

  this.upward = () => {
      this.direction = 'upward';
  };

  this.downward = () => {
      this.direction = 'downward';
  };

  this.backward = () => {
      this.direction = 'backward';
  };

  this.forward = () => {
    this.direction = 'forward';
  };

  this.getBulletSpawnPos = () => {
    return {x:this.xPos+this.width,y:this.yPos+this.height - 10};
  }

  this.getCenter = () => {
    return {x:this.xPos + (this.width / 2),y:this.yPos + (this.height / 2)}
  }

  this.playerMovement = () => {
    if(this.direction === 'downward' && this.yPos+this.height < CANVAS_DIMENSION.height) {
      this.yPos += this.speed;
    } else if(this.direction === 'upward' && this.yPos > 0) {
        this.yPos -= this.speed;
    } else if(this.direction === 'forward' && this.xPos+this.width < CANVAS_DIMENSION.width) {
      this.xPos += this.speed;
    } else if(this.direction === 'backward' && this.xPos > 0) {
        this.xPos -= this.speed;
    }
  }

  this.playerHitted = (damage) => {
    this.life -= damage;
  }

  this.checkLife = () => {
    if(this.isActive && this.life <= 0) {
      createExplosion(this.getCenter().x,this.getCenter().y);
    }
    this.isActive = this.life > 0;
  }

  this.drawGuideDot = (CAN_) => {
    const bulletPos = this.getBulletSpawnPos();
    const center = this.getCenter();
    CAN_.fillStyle = '#fff';
    CAN_.fillRect(bulletPos.x,bulletPos.y,2,2);
    CAN_.fillRect(center.x,center.y,2,2);
  }
}
