import { Injectable } from '@nestjs/common'
import { hash } from 'argon2'

import { PrismaService } from '../prisma.service'
import { AuthDto } from '../auth/dto/auth.dto'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async getById(id: string) {
		return this.prisma.user.findUnique({
			where: {
				id
			},
			include: {
				stores: true,
				favorites: true,
				orders: true
			}
		})
	}

	async getByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: {
				email
			},
			include: {
				stores: true,
				favorites: true,
				orders: true
			}
		})
	}

	async create(dto: AuthDto) {
		return this.prisma.user.create({
			data: {
				name: dto.name,
				email: dto.email,
				password: await hash(dto.password)
			}
		})
	}
}
