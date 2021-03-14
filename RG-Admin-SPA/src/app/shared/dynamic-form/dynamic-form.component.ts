import { Component, OnInit } from '@angular/core';
import { DynamicFormBuildConfig, DynamicFormConfiguration, RxDynamicFormBuilder } from '@rxweb/reactive-dynamic-forms';
import { ReactiveFormConfig } from '@rxweb/reactive-form-validators';
import { SameAsAddressModel } from '../models/same-as-address.model';
import { StateModel } from '../models/state.model';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  formData = [
    {
      type:'text',
      name:'firstName',
      validators:{
        required:true
      },
      ui:{label:'First Name',placeholder:'Enter Your First Name'}
    },
    {
      type:'select',
      name:'country',
      ui:{label:'Country',placeholder:'Select...'},
      validators:{
        required:true
      },
      source:[{value:1,text:'India'},{value:2,text:'Canada'}, {value:1,text:'USA'}]
    },
    {
      type:'select',
      name:'state',
      validators:{
        required:{conditionalExpression:"x => x.country != undefined && x.country != null"}
      },
      ui:{label:'State',placeholder:'Select...'},
      modelName:'state',
      filter:[{value:1,text:'Gujarat',countryId:1},{value:2,text:'Ontario',countryId:2}, ,{value:3,text:'Massachusetts',countryId:3}]
    },
    {
      type:'textarea',
      name:'permanentAddress',
      ui:{label:'Permanent Address',placeholder:'Enter Your Permanent Address'}
    },
    {
      type:'checkbox',
      name:'sameAsPermanent',
      modelName:'sameAsAddress',
      source:[{value:1,text:'Same As Permanent'}]
    },
    {
      type:'textarea',
      name:'correspondenceAddress',
      ui:{label:'Correspondence Address',placeholder:'Enter Your Correspondence Address'}
    }
  ]

  dynamicForm:DynamicFormBuildConfig;
  uiBindings:string[] = ["firstName","country","state","permanentAddress","sameAsPermanent","correspondenceAddress"];
  dynamicFormConfiguration:DynamicFormConfiguration;
  
  constructor(
    private dynamicFormBuilder:RxDynamicFormBuilder
  ){}

  ngOnInit(): void {
    ReactiveFormConfig.set({
      validationMessage:{
        required:'This Field is required'
      }
    })
    this.dynamicFormConfiguration = {
      controlConfigModels:[{modelName:"state",model:StateModel},{modelName:"sameAsAddress",model:SameAsAddressModel}]
    }
      this.dynamicForm = this.dynamicFormBuilder.formGroup(this.formData, this.dynamicFormConfiguration)
  }
}