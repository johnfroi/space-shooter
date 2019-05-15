function ENEMY_1() {
  this.life = 5;
  this.animStep = 0;
  this.maxAnimStep = 5;
  this.speed = 1.5;
  this.animStepSpeed = 0.1;
  this.xPos = 30;
  this.yPos = 30;
  this.width = 30;
  this.height = 27;
  this.image =new Image();
  this.isActive = true;
  this.damage = 1;
  this.init = (x,y) => {
    this.xPos = x;
    this.yPos = y;
    this.image.src = 'enemy-1/enemy-1.png';
  },
  this.draw = (CAN_) => {
    this.checkLife();
    this.enemyPosIsLessThanZero();
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
    this.drawGuideDot(CAN_);
    this.animStep+=this.animStepSpeed;
    this.xPos -= this.speed;
  }

  this.enemyPosIsLessThanZero = () => {
    if(this.xPos+this.width < 0) {
      this.isActive = false;
    }
  }

  this.hitted = () => {
    this.life--;
  }

  this.checkLife = () => {
    this.isActive = this.life > 0;
  }

  this.getCenter = () => {
    return {x:this.xPos + (this.width / 2),y:this.yPos + (this.height / 2)};
  }

  this.drawGuideDot = (CAN_) => {
    const center = this.getCenter();
    CAN_.fillStyle = '#fff';
    CAN_.fillRect(center.x,center.y,2,2);
  }
}

function enemyController() {
  enemies = enemies.filter(enemy_ => {
    if(enemy_.isActive) {
      return true;
    }
    if(enemy_.life <= 0) {
      const center = enemy_.getCenter();
      createExplosion(center.x,center.y);
    }
    return false;
  });
  for(let i = 0;i<enemies.length;i++){
    enemies[i].draw(CAN);
    enemyCollision(enemies[i]);
  }
}

function enemyCollision(enemy) {
  if(player.isActive) {
    const enemyCenter = enemy.getCenter();
    const playerCenter = player.getCenter();
    const xDistance = enemyCenter.x - playerCenter.x;
    const yDistance = enemyCenter.y - playerCenter.y;
    var xDis=Math.sqrt(xDistance*xDistance);
    var yDis=Math.sqrt(yDistance*yDistance);
    if(xDis < (player.width / 2) + (enemy.width/2) && yDis < (player.height / 2) + (enemy.height/2)) {
      enemy.life = 0;
      player.playerHitted(enemy.damage);
    }
  }
}
