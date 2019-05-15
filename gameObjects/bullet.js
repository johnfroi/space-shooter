function BULLET() {
  this.xPos = 0;
  this.yPos = 0;
  this.width = 10;
  this.height = 10;
  this.image = new Image();
  this.isActive = true;
  this.init = (x,y) => {
    this.xPos = x - (this.width / 2);
    this.yPos = y - (this.height / 2);
    this.image.src='alpha-1/alpha-1-bullet.png';
  }
  this.draw = (CAN_) => {
    if(this.xPos >= 1200) {
      this.isActive = false;
    }
    CAN_.save();
    CAN_.translate(this.xPos,this.yPos);
    CAN_.drawImage(
      this.image,0,0);
    CAN_.restore();
    this.xPos+=9;
  }
  this.getCenter = () => {
    return {x:this.xPos + (this.width / 2),y:this.yPos + (this.height / 2)};
  }
}

function bulletController() {
  bullets = bullets.filter(bullet_=> bullet_.isActive);
  for(let i = 0;i<bullets.length;i++){
    bullets[i].draw(CAN);
    bulletCollide(bullets[i],i);
  }
}

function bulletCollide(bullet) {
  const bulletCenter = bullet.getCenter();
  for(let x = 0;x<enemies.length;x++) {
    const enemyGetCenter = enemies[x].getCenter();
    var xx=enemyGetCenter.x-bulletCenter.x;
		var yy=enemyGetCenter.y-bulletCenter.y;
		var dis=Math.sqrt(yy*yy+xx*xx);
    if(dis <= enemies[x].width - 5) {
      bullet.isActive=false;
      createBulletExplosion(bulletCenter.x,bulletCenter.y);
      enemies[x].hitted();
    }
  }
}
