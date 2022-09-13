
// import Player2 from "./Player2";
const {ccclass, property} = cc._decorator;

export enum LoadLevelState{
    LOAD = 1,
    NONE = 0,
}

@ccclass
export default class GameManager extends cc.Component {

    public reachLevel: number = 2;

    public static instance: GameManager;

    loadmap:boolean = false;

    @property(cc.Node)
    player:cc.Node = null;

    loadState:number = null

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        let physic_manager = cc.director.getPhysicsManager();
        physic_manager.enabled = true;
        physic_manager.gravity = cc.v2(0,-2000); 

        this.loadState = LoadLevelState.NONE;

        //active debugDrawPhysics
        physic_manager.debugDrawFlags = 1;

        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;

        GameManager.instance = this;
        // this.LoadLevel(this.reachLevel);
    }

    start () {

    }

    //#region LOAD LEVEL
    @property(cc.Node)
    private levelContainer: cc.Node = null;

    // reLoadLevel(){

    // }
    
    LoadLevel(LevelNo: number) {

        let self = this;
        console.log("LOAD LEVEL");
        if (LevelNo >= 4) return;

        let progressBarNode = cc.find('Canvas/GameManager/ProgressBar/bar');
        let progressBar = progressBarNode.getComponent('ProgressBar');

        cc.resources.load(`LevelPrefab/Level${LevelNo}`, function (completedCount, totalCount, item) {
            progressBar.num = completedCount / totalCount;
            progressBar.show();
        }, function () {
            progressBar.hide();
        });
        
        let start = this.node.getChildByName("start");
        start.active = false;

        cc.resources.load(`LevelPrefab/Level${LevelNo}`, function (err, prefab: cc.Prefab) {
            if (err) {
                console.log("URL " + `LevelPrefab/Level${LevelNo}`);
                console.log("ERR " + err);
                self.LoadLevel(LevelNo + 1);
            } else {
                GameManager.instance.OnLoadLevelSuccess(prefab, LevelNo);
            }
        });

    }

    currentLevelData:number = null;

    private OnLoadLevelSuccess(LevelPrefab: cc.Prefab, LoadedLevelNo: number) {
        console.log("Load Success");
        

        this.reachLevel = LoadedLevelNo;
        let currentLevel: cc.Node = cc.instantiate(LevelPrefab);

        currentLevel.name = `LEVEL${LoadedLevelNo}`;
        this.levelContainer.addChild(currentLevel);
        // currentLevel.position = cc.v3(0, 0, 0);
        this.currentLevelData = 1;
        this.loadmap = true;
        this.player.active = true; 

        // GameManager.instance.preloadLevelNext(this.reachLevel + 1);
    }

    OnFinishLevel(){
        this.levelContainer.removeAllChildren();
    }

    nextLevel(){
        this.LoadLevel(this.reachLevel+1);
    }

    returnLevel(){
        this.LoadLevel(this.reachLevel);
        this.loadState = LoadLevelState.NONE;
    }

    preloadLevelNext(LevelNo: number){
        cc.resources.preload(`LevelPrefab/Level${LevelNo}`);
    }

    //#endregion LOAD LEVEL
    
    
    update (dt) {
        // if(this.loadmap === true){
        //     this.player.active = true;
        // }
    }
}
