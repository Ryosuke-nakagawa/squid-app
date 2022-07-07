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
			gravity: {y: 300}// 重力の方向とその強さ
		}
	}
}

// 2, Phaser3オブジェクトを作る
let phaser = new Phaser.Game(config);

function preload(){
	console.log("preload!!");
    this.load.image("into_sea", "./assets/into_sea.png");
    this.load.image("squid", "./assets/squid.png");
    this.load.image("ground", "./assets/ground.png");
}

function create(){
	console.log("create!!");
    this.add.image(D_WIDTH/2, D_HEIGHT/2, "into_sea")
    player = this.physics.add.sprite(240, 80, "squid")
    let staticGroup = this.physics.add.staticGroup();// 動かない物体をまとめる
	staticGroup.create(D_WIDTH/2, D_HEIGHT-32, "ground");// 地面
	this.physics.add.collider(player, staticGroup);// 衝突処理を設定する
}

function update(){
	console.log("update!!");
    let cursors = this.input.keyboard.createCursorKeys();
    let keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    let keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
    let keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
	if(cursors.up.isDown || keyJ.isDown){
		//console.log("Up!!");
		player.setVelocityY(-200);// 上方向の速度を設定
	}else if(cursors.left.isDown || keyH.isDown){
		//console.log("Left");
		player.setVelocityX(-200);// 左方向の速度を設定
	}else if(cursors.right.isDown || keyL.isDown){
		//console.log("Right!!");
		player.setVelocityX(200);// 右方向の速度を設定
	}else{
		player.setVelocityX(0);// 横方向の速度を0
	}
}