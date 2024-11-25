import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AppService {

  sendMailConfirm(data) {
    let configMail = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hoaitrongdang@gmail.com",
        pass: "atyfewlhpiibfupb"
      }
    })
    configMail.sendMail({
      from: "hoaitrongdang@gmail.com",
      to: data,
      subject: "Đặt hàng qua Amazon",
      html: "<h1> Xác nhận đơn hàng thành công </h1>"
    }, error => error);
  }

  sendMailSuccess(data) {
    let configMail = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hoaitrongdang@gmail.com",
        pass: "atyfewlhpiibfupb"
      }
    })
    configMail.sendMail({
      from: "hoatirongdang@gmail.com",
      to: data,
      subject: "Đặt hàng qua Beamin",
      html: "<h1 style='color:red' > Đặt hàng thành công </h1>"
    }, error => error);
  }
}
