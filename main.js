const D_WIDTH = 1400;
const D_HEIGHT = 700;

// 1, Phaser3の設定データ
const config = {
  type: Phaser.AUTO,
  width: D_WIDTH,// ゲーム画面の横幅
  height: D_HEIGHT,// ゲーム画面の高さ
  antialias: false,
  scene: {
  	preload: preload,// 素材の読み込み時の関数
  	create: create,// 画面が作られた時の関数
  	update: update// 連続実行される関数
  },
  fps: {
  	target: 24,// フレームレート
  	forceSetTimeOut: true
  },
  physics: {
  	default: "arcade",
  	arcade: {
  		debug: true,// スプライトに緑の枠を表示します
  		gravity: {y: 300},// 重力の方向とその強さ
        enableBody: true
  	}
  }
}

// 2, Phaser3オブジェクトを作る
let phaser = new Phaser.Game(config);

function preload(){
  console.log("preload!!");
  this.load.image("into_sea", "./assets/into_sea.png");
  this.load.image("squid", "./assets/squid.png");
  this.load.image("egi", "./assets/egi.png");
  this.load.image("ground", "./assets/ground.png");
}

function create(){
  console.log("create!!");
  // 背景
  this.add.image(D_WIDTH/2, D_HEIGHT/2, "into_sea")
  // プレイヤー
  player = this.physics.add.sprite(240, 80, "squid")
  // 動く物体をまとめる
  let egiGroup = this.physics.add.group();
  egiGroup.create(600, 600, "egi");
  egiGroup.create(800, 500, "egi");
  // 動かない物体をまとめる
  let staticGroup = this.physics.add.staticGroup();
  staticGroup.create(D_WIDTH/2, D_HEIGHT + 30, "ground")
  // 衝突処理を設定する
  this.physics.add.collider(egiGroup, staticGroup);
  this.physics.add.collider(player, staticGroup);
  // 当たり判定
  this.physics.add.overlap(player, egiGroup, gameOver, null, this);
}

function update(){
  console.log("update!!");
  let cursors = this.input.keyboard.createCursorKeys();
  let keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
  let keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
  let keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
  if(cursors.up.isDown || keyJ.isDown){
      player.setVelocityY(-200);// 上方向の速度を設定
    }else if(cursors.left.isDown || keyH.isDown){
      player.setVelocityX(-200);// 左方向の速度を設定
    }else if(cursors.right.isDown || keyL.isDown){
      player.setVelocityX(200);// 右方向の速度を設定
    }else{
      player.setVelocityX(0);// 横方向の速度を0
    }
}

function gameOver(){
  this.physics.pause();
  player.anims.play('turn');
  let gameOverText = this.add.text(200, 200, 'GAME OVER', { fontSize: '32px', fill: '#fff' });
}