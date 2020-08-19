<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'id' => Str::uuid(),
            'name' => 'Chocin Admin',
            'username' => 'chocin',
            'email' => 'chocin@example.com',
            'password' => Hash::make('password'),
            'remember_token' => Str::random(10),
            'last_login' => now(),
            'is_super_admin' => true,
            'picture' => 'star.png-1597175921.png',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
