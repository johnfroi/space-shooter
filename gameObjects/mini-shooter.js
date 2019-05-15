function MINI_SHOOTER_ADAPTER() {
  this.miniShips = [];
  this.rotation = 0;
  this.rotationSpeed = 0.6;
  this.count = 0;
  this.distance = 60;
  this.refreshAnimation = false;
  this.compress = true;
  this.maxDistance = 60;
  this.minDistance = 0;
  this.addRemove = null;
  this.draw = (CAN_) => {
    const miniShipsLength = this.miniShips.length;
    const rad = 360 / miniShipsLength;
    for(let i = 0; i < miniShipsLength; i++) {
      var xx=this.distance*Math.cos(this.rotation*(Math.PI/180))+(player.getCenter().x - (this.miniShips[i].width/2));
      var yy=this.distance*Math.sin(this.rotation*(Math.PI/180))+(player.getCenter().y - (this.miniShips[i].height/2));
      this.miniShips[i].setPosition(xx,yy);
      this.miniShips[i].draw(CAN_);
      this.rotation += rad + this.rotationSpeed;
      if(this.rotation>=36000){
          this.rotation = this.rotation - 36000;
      }
    }
    if(!this.refreshAnimation && miniShipsLength < 6) {
      this.count++;
      if(this.count%200 === 0) {
        this.startAnimation();
      }
    }
    this.addRemovedMiniShooterAnimation();
  };

  this.addRemovedMiniShooterAnimation = () => {
    if(this.refreshAnimation) {
      if(this.compressAnimation) {
        this.distance -= 2;
        if(this.distance <= this.minDistance) {
          this.compressAnimation = false;
          if(this.compressAnimation === 'remove') {
            this.removeInActiveMiniShooter();
          } else {
            this.addMiniShooter();
          }
        }
      } else {
        this.distance += 2;
        if(this.distance >= this.maxDistance) {
          this.stopAnimation();
        }
      }
    }
  };

  this.removeInActiveMiniShooter = () => {
      this.miniShips = this.miniShips.filter(ship => ship.isActive);
  };

  this.addMiniShooter = () => {
    this.miniShips.push(new MINI_SHOOTER());
  };

  this.stopAnimation = () => {
      this.refreshAnimation = false;
      this.compressAnimation = false;
      this.distance = this.maxDistance;
  };

  this.startAnimation = () => {
      this.refreshAnimation = true;
      this.compressAnimation = true;
  };
}

function MINI_SHOOTER() {
  this.width = 30;
  this.height = 30;
  this.isActive = true;
  this.animStep = 0;
  this.maxAnimStep = 4;
  this.animStepSpeed = 0.1;
  this.xPos = 0;
  this.yPos = 0;
  this.image = new Image();
  this.initStatus = false;
  this.isActive = true;
  this.bulletSpawnTime = 70;
  this.bulletSpawnTimer = this.bulletSpawnTime;
  this.init = () => {
      if(this.initStatus == false) {
        this.initStatus = true;
        this.image.src='mini-shooter/mini-shooter.png';
      }
  }

  this.draw = (CAN_) => {
    if(!this.isActive) {
      return;
    }
    this.init();
    this.bulletSpawnController();
    if(this.animStep >= this.maxAnimStep) {
      this.animStep = 0;
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
    this.animStep+=0.1;
  }

  this.bulletSpawnController = () => {
      this.bulletSpawnTimer -= 1;
      if(this.bulletSpawnTimer <= 0) {
        this.bulletSpawnTimer = this.bulletSpawnTime;
        createBullet(this.xPos + (this.width/2),this.yPos+ (this.height/2));
      }
  }

  this.setPosition = (x,y) => {
    this.xPos=x;
    this.yPos=y;
  }
}
