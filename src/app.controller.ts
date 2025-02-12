import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';

const testData: { id: number; message: string }[] = [
  {
    id: 1,
    message: 'Hello, world!-1',
  },
  {
    id: 2,
    message: 'Hello, world!-2',
  },
];

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/api/test')
  getTest(): { id: number; message: string }[] {
    return testData;
  }

  @Get('/api/test/:id')
  getTestById(@Param('id') id: number): { id: number; message: string } {
    const data = testData.find((data) => data.id === id);
    if (!data) {
      throw new NotFoundException('Data not found');
    }
    return data;
  }

  @Post('/api/test')
  createTest(@Body() body: { message: string }): {
    id: number;
    message: string;
  } {
    const newData = {
      id: testData.length + 1,
      message: body.message,
    };
    testData.push(newData);
    return newData;
  }

  @Put('/api/test/:id')
  updateTest(
    @Param('id') id: number,
    @Body() body: { message: string },
  ): {
    id: number;
    message: string;
  } {
    const data = testData.find((data) => data.id === id);
    if (!data) {
      throw new NotFoundException('Data not found');
    }
    data.message = body.message;
    return data;
  }

  @Delete('/api/test/:id')
  deleteTest(@Param('id') id: number): void {
    const index = testData.findIndex((data) => data.id === id);
    if (index === -1) {
      throw new NotFoundException('Data not found');
    }
    testData.splice(index, 1);
  }
}
