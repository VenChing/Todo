<template>
  <div id="App">
    <div id="Input">
      <header>
        <section>
          <form id="form">
            <label for="titile">待办事项</label>
            <!-- input输入框绑定todo时间，keydown的值为13即是回车，占位符，必填项 记录输入值-->
              <input type="text" v-model="todo" @keydown.13="Enter" placeholder="添加事项" required="required" autocomplete="off">
          </form>
        </section>
      </header>
      
      <section class="sccs">
        <h2>进行事项</h2>
        <ol>
          <!-- 循环遍历list 对象index 数组key，如果CheckBox没打勾 -->
          <li v-for="(item, index) in list" :key="index" v-if="!item.checked">
            <!-- 双向绑定事件 @change绑定h5储存-->
            <input type="checkbox" v-model="item.checked" @change="saveList()"> 
                 {{item.title}} 
            <input type="button" value="删除" @click="del(index)">
            <!-- index索引删除与编辑 -->
            <input type="button" value="编辑" @click="edit(index)">
          </li>

        </ol>

        <h2>完成事项</h2>
        <ol>
          <li v-for="(item,index) in list" :key="index" v-if="item.checked">
            <input type="checkbox" v-model="item.checked" @change="saveList()">
                 {{item.title}}
            <input type="button" value="删除" @click="del(index)">
            <input type="button" value="编辑" @click="edit(index)">
          </li>
        </ol>
      </section>
    </div>
  </div>
</template>
<script>
import storage from '../model/storage.js';

export default {
  data(){
    return {
      todo:'',
      list:[],
      indexList:'',
      //inputToDisabled:false
    }
  },
  methods:{
    //增
    Enter(){
        if(this.todo !=""){
            this.list.push({
            title:this.todo,
            checked:false,
          })
        }else{
          this.$alert('啊哈，空空如也', '输入有误', {
             confirmButtonText: '确定',
          //   callback: action => {
          //   this.$message({
          //     type: 'info',
          //     message: `action: ${ action }`
          //   });
          // }
        });
        }
        this.todo=''
        storage.set('list',this.list);
    },
    //删
    del(key){
      this.$confirm('你真的不要小可爱了吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.list.splice(key,1);
           storage.set('list',this.list);
          this.$message({
            type: 'success',
            message: '你可别后悔!哼...'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '知道你还爱我的'
          });          
        });
    },saveList(){
      storage.set('list',this.list);
    },
    //改
    edit(index) {
      this.$prompt('你需要咋样修改呢？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          if(value==null){
             this.$alert('哦嗬，似乎不对哦', '输入有误', {
             confirmButtonText: '确定',
          //   callback: action => {
          //   this.$message({
          //     type: 'info',
          //     message: `action: ${ action }`
          //   });
          // }
        });
          }else{
             this.list[index].title =value,
             storage.set('list',this.list);
            // 执行重新赋值
            // console.log(value),
            this.$message({
            type: 'success',
            message: '修改成功(◕ܫ◕) ' 
          });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '啥也没改 ╮(๑•́ ₃•̀๑)╭'
          });       
        });
    //  console.log(index)
    },
    // Disable(index){
    //   if(checked.index !=true){
    //     edit(index);
    //   }else{
    //     edit(index).false
    //   }
    // }
  },
  mounted(){
    var list=storage.get('list')

    if(list){
      this.list=list;
    }
  }
}
</script>

<style>
  body{
  padding: 0;
  margin: 0;
  background: #cdcdcd;
  }
  #Input{
    text-align: center;
  }
  #form{
    font-size: 23px;
    color: coral;
    background: #000;
    height: 50px;
  }
  #form label{
    margin-right: 50px;
    vertical-align:middle;
    line-height: 50px;
  }
  #form input[type="text"]{
    height: 25px;
    width: 350px;
    border-radius: 6px;
    /* box-shadow:3px 3px 3px #ccc; */
  }
   /* #form input[type="button"]{
     height: 35px;
     box-shadow:2px 1px 2px #ccc;
   } */
  .sccs{
    margin-right: 398px;
  }
</style>
