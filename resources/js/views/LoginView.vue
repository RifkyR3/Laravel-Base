<script setup>
import {Field, Form} from "vee-validate";
import * as Yup from 'yup';
import {useAuthStore} from "@/stores";

const schema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required')
});

function onSubmit(values) {
    console.log(values);
    const authStore = useAuthStore();
    const {email, password} = values;
    authStore.login(email, password);
}
</script>

<template>
    <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
        <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
            <div class="flex items-center justify-center">
                <span class="text-2xl font-semibold text-gray-700">Login</span>
            </div>

            <Form v-slot="{ errors, isSubmitting }" :validation-schema="schema" @submit="onSubmit">
                <div class="block">
                    <span class="text-sm text-gray-700">Email</span>
                    <Field
                        :class="{ 'is-invalid': errors.email }"
                        class="form-control block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                        name="email" type="email"
                    />
                    <div class="invalid-feedback">{{ errors.email }}</div>
                </div>

                <div class="block mt-3">
                    <span class="text-sm text-gray-700">Password</span>
                    <Field
                        :class="{ 'is-invalid': errors.password }"
                        class="form-control block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                        name="password" type="password"
                    />
                    <div class="invalid-feedback">{{ errors.password }}</div>
                </div>

                <div class="flex items-center justify-between mt-4">
                    <div>
                        <label class="inline-flex items-center">
                            <input type="checkbox" class="text-indigo-600 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" />
                            <span class="mx-2 text-sm text-gray-600">Remember me</span>
                        </label>
                    </div>
                    <div>
                        <a
                            class="block text-sm text-indigo-700 fontme hover:underline"
                            href="#"
                        >Forgot your password?</a
                        >
                    </div>
                </div>

                <div class="mt-6">
                    <button :disabled="isSubmitting"
                        type="submit"
                        class="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500"
                    >
                        Sign in
                    </button>
                </div>
                <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{ errors.apiError }}</div>
            </Form>
        </div>
    </div>
</template>
