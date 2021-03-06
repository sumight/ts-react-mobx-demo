import { action, computed, configure, observable } from 'mobx'
import DForm from './DForm'
import PostList from './PostList'
import MultSelector from './smooth/MultSelector'
import Selector from './smooth/Selector'
import UserForm from './UserForm'
configure({ enforceActions: true })

declare const window:{store:Store}

const options = [{
  text: 'xxx',
  value: 111
},{
  text: 'yyy',
  value: 222
},{
  text: 'zzz',
  value: 333
}]

class Store {
  @observable public testSelect:Selector<number> = new Selector<number>(options);
  @observable public testMultSelect:MultSelector<number> = new MultSelector<number>(options);
  @observable public posts:PostList = new PostList();
  @observable public list:string[] = [];
  @observable public message:string = 'xxxxx';
  @observable public user:UserForm = new UserForm()
  @observable public dform:DForm = new DForm()
  @observable public gender:string = '';
  
  @computed get total () {
    return this.list.length
  }
  @action.bound public add () {
    if (this.message === '') {
      return
    }
    this.list.push(this.message)
    this.message = ''
  }
  @action.bound public changeMessage (message:string) {
    this.message = message
  }
  @action.bound public remove (index:number) {
    this.list = this.list.filter((item, i) => i!==index)
  }
  @action.bound public clean () {
    this.list = []
  }
  @action.bound public changeItem (index:number, message:string) {
    this.list[index] = message
  }
}

const store = new Store()
window.store = store
export default store