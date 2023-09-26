import { NextRequest, NextResponse } from "next/server"
import {isFormValue} from "@/interfaces/interface_Kontakt"

export async function POST(req: NextRequest, res: NextResponse){

    let nodemailer:any = require('nodemailer')

    const data: isFormValue = await req.json()

    const transporter = nodemailer.createTransport({
        port: 465,     
        host: "mail.cyon.ch",
          auth: {
            user: "info@schussfreude.ch",
            pass: process.env.PW!,
          },
        secure: true,
      });
        
      const mailData = {
          from: data.mail,
          to: `info@schussfreude.ch`,
          cc: data.mail,
          subject: `schussfreude: Nachricht von ${data.name}`,
          text: data.message,
          html: `<div>${data.message}</div>`
      }
      
      try{
        await transporter.sendMail(mailData)
      } catch(err){
        return NextResponse.json(data)
      }
    
      return NextResponse.json(data)
}