import { Component } from '@angular/core';
import { FcmService } from '../services/fcm.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})


export class Tab3Page {
  private groups = [ 
    {
      name:'Tin nhan chung cua nha tho', 
      topicId: 'MainGroup01',
      status:true, 
      subItems:[ 
        {
          name:'Tin nhan nha tho 01', 
          topicId: 'MainGroup01.SubGroup01',
          status:false,   
        },
        {
          name:'Tin nhan nha tho 02', 
          topicId: 'MainGroup01.SubGroup02',
          status:false,   
        },
        {
          name:'Tin nhan nha tho 03', 
          topicId: 'MainGroup01.SubGroup03',
          status:false,   
        }
      ]
    },
    {
      name:'Tin nhan chung cua TNTT', 
      topicId: 'MainGroup02',
      status:false, 
      subItems:[ 
        {
          name:'Tin nhan cua TNTT 01', 
          topicId: 'MainGroup02.SubGroup01',
          status:true,   
        },
        {
          name:'Tin nhan cua TNTT 02', 
          topicId: 'MainGroup02.SubGroup02',
          status:false,   
        },
        {
          name:'Tin nhan cua TNTT 03', 
          topicId: 'MainGroup02.SubGroup03',
          status:false,   
        }
      ]
    }
  ];

  constructor(private fcm: FcmService) {
  }

  public getTopicGroups() {
    return this.groups;
  }

  public saveSubscriptions() {
    for (let group of this.groups) {
      for (let item of group.subItems) {
        if (!item.status)
          continue;
          
        console.log("subscribing to topic " + item.topicId)
        this.fcm.subscribeToTopic(item.topicId);
      }
    }
  }

  public checkboxGroupClicked(parentGroup: any) {
    console.log("checkbox name " + parentGroup.name)
    for(let item of parentGroup.subItems) {
      item.status = parentGroup.status
      console.log("sub-item status " + item.status)
    }
  }

  public checkboxItemClicked(parentGroup: any, item: any) {
    console.log("group name " + parentGroup.name + " checkbox name " + item.name)
    let tmp = true;
    for(let sitem of parentGroup.subItems) {
      tmp = tmp && sitem.status
      console.log("sub-item name " + sitem.name + " sub-item status " + sitem.status + " new group status " +tmp)
    }
    parentGroup.status = tmp
  }

}
