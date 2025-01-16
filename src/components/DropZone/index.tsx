import { Center, Group, Stack, Text } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useState } from 'react';
import { FileType, useGetLinkFileToS3 } from '@/services/s3-aws';

export function DropZone(props: Partial<DropzoneProps>) {
    const {mutate:uploadFile} = useGetLinkFileToS3()
    const [isLoading, setIsLoading] = useState(false);
    const handleDrop = (files: File[]) => {
        setIsLoading(true);
        uploadFile({file_name: files[0].name, file_type: files[0].type})
    }
  return (
    <Dropzone
      onDrop={(files) => handleDrop(files)}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      loading={isLoading}
      {...props}
      className='border-2 border-dashed border-gray-300 rounded-lg p-1 my-2'
    >
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload size={52} color="var(--mantine-color-blue-6)" stroke={1.5} />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto size={52} color="var(--mantine-color-dimmed)" stroke={1.5} />
        </Dropzone.Idle>
        <Center>
          <Stack>
            <Text size="xl" inline>
                Thêm Hình Ảnh Vào Đây
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
                Đảm Bảo Kích Thước Dưới 5MB, và ảnh có đuôi jpg
            </Text>
          </Stack>
        </Center>
      </Group>
    </Dropzone>
  );
}