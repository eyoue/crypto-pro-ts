import {Component, QueryList, ViewChildren} from '@angular/core';
import {tap} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";
import {XMLESignDirective} from "@utp/e-sign-lib";
import {CertificateModel} from "@utp/e-sign-lib/lib/models";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'e-sign';
  @ViewChildren(XMLESignDirective) xmlESignList: QueryList<XMLESignDirective>;

  constructor(private dialog: MatDialog) {
  }

  openSignDialog1() {
    const xmlDirective = this.xmlESignList.get(0);
    const getDialogContext = (certificates: CertificateModel[]) => {
      return this.dialog.open(DialogComponent, {
        width: '800px',
        data: {
          title: 'Sign dialog 1',
          actionButton: {
            label: 'Sign',
            disabled: !xmlDirective.selectedCertificate,
            selectionAction: (data: any) => {
              xmlDirective.selectedCertificate = data;
            },
            clickAction: () => {
              xmlDirective.sign();
            }
          },
          cancelButton: {
            label: 'Close',
          },
          listItems: certificates.map((cert) => ({
            data: cert,
            view: `
            <span>${cert.name}</span>
            <span>${cert.issuerName}</span>
            <span>${cert.validTo}</span>
            `
          }))
        }
      });
    }
    const getPreparedJson = () => {
      return {json: {data: 'xxx'}}
    }
    const certificates = xmlDirective.getCertificates();
    const action = () => {
      xmlDirective.jsonObject = getPreparedJson();
      certificates.pipe(tap(getDialogContext)).subscribe()
    }

    action()
  }
  openSignDialog2() {
    const xmlDirective = this.xmlESignList.get(1);
    const getDialogContext = (certificates: CertificateModel[]) => {
      return this.dialog.open(DialogComponent, {
        width: '400px',
        data: {
          title: 'Sign dialog 2',
          actionButton: {
            label: 'Sign',
            disabled: !xmlDirective.selectedCertificate,
            selectionAction: (data: any) => {
              xmlDirective.selectedCertificate = data;
            },
            clickAction: () => {
              xmlDirective.sign();
            }
          },
          cancelButton: {
            label: 'Close',
          },
          listItems: certificates.map((cert) => ({
            data: cert,
            view: `
            <span>${cert.name}</span>
            <span>${cert.issuerName}</span>
            <span>${cert.validTo}</span>
            `
          }))
        }
      });
    }
    const getPreparedJson = () => {
      return {json: {data: 123}}
    }
    const certificates = xmlDirective.getCertificates();
    const action = () => {
      xmlDirective.jsonObject = getPreparedJson();
      certificates.pipe(tap(getDialogContext)).subscribe()
    }

    action()
  }

  getSignedXML({ payload }: {payload: string}) {
    console.log(payload)
  }
  getSignError({ payload }: {payload: string}) {
    console.log(payload)
  }
}
