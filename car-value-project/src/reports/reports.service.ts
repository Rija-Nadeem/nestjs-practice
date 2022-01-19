import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Reports } from './reports.entity';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Reports) private repo: Repository<Reports>){}

    create(reportDto: CreateReportDto, user: Users){
        const report = this.repo.create(reportDto);
        //Associate user with report
        report.user = user;
        return this.repo.save(report);
    }
}
